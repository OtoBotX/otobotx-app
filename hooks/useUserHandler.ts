import { use$ } from "@legendapp/state/react";
import { userStore$ } from "@/stores/userStore";
import { useEffect, useRef } from "react";
import supabase from "@/utils/supabase";
import { t } from "@/i18n/t";
import { Tables } from "@/types/database.types";
import { userSignUpSchema } from "@/validation/userSignUpSchema";
import { router } from "expo-router";

function validateUserRegister(): { success: true } | { success: false; message: string } {
  const result = userSignUpSchema.safeParse({
    email: userStore$.email.get(),
    password: userStore$.passwordTemp.get(),
    first_name: userStore$.first_name.get(),
    last_name: userStore$.last_name.get(),
    office_id: userStore$.office_id.get(),
    office_role_id: userStore$.office_role_id.get(),
  });

  if (!result.success) {
    const err = result.error.errors[0];
    return {
      success: false,
      message: `${t("validation.registration.fields." + err.path[0])}: ${t("validation.registration.errors." + err.message)}`,
    };
  }

  return { success: true };
}


function validateEmail(): { success: true } | { success: false; message: string } {
  const result = userSignUpSchema.pick({ email: true }).safeParse({
    email: userStore$.email.get(),
  });

  if (!result.success) {
    const err = result.error.errors[0];
    return {
      success: false,
      message: `${t("validation.registration.fields." + err.path[0])}: ${t("validation.registration.errors." + err.message)}`,
    };
  }

  return { success: true };
}

function validatePasswordReset(): { success: true } | { success: false; message: string } {
  const result = userSignUpSchema.pick({ password: true }).safeParse({
    password: userStore$.passwordTemp.get(),
  });

  if (!result.success) {
    const err = result.error.errors[0];
    return {
      success: false,
      message: `${t("validation.registration.fields." + err.path[0])}: ${t("validation.registration.errors." + err.message)}`,
    };
  }

  return { success: true };
}

const loadUserProfile = async () => {
    
  const session = userStore$.session.get();
  const email = session?.user.email;
  const uid = session?.user.id;
  const { data: profileData, error: userError } = await supabase
    .from("Users")
    .select("*") // no joins!
    .single()
  if (userError) {
    console.error("Failed to fetch user table", userError);
    return;
  }
  userStore$.email.set(email ?? "");
  userStore$.first_name.set(profileData.first_name);
  userStore$.last_name.set(profileData.last_name);
  userStore$.isAdmin.set(profileData.isAdmin);
};

export const useUserHandler = () => {

    const dropdownLoaded = useRef(false);
    useEffect(() => {
      const loadDropdownData = async () => {

        const { data: officeData, error: officeError } = await supabase
          .from("Offices")
          .select("id, uname");
        if (officeData) userStore$.offices.set(officeData as Tables<"Offices">[]);

        const { data: roleData } = await supabase
          .from("OfficeRoles")
          .select("id, name");
        if (roleData) userStore$.roles.set(roleData as Tables<"OfficeRoles">[]);

      };


      if (!dropdownLoaded.current) {
        loadDropdownData();
        dropdownLoaded.current = true;
      }
    }, []);

    const session = use$(() => userStore$.session);
    const hasFetchedProfile = useRef(false);
    useEffect(() => {
      if (session) {
        loadUserProfile();
        hasFetchedProfile.current = true;
      }
    }, [session]);

    const $ = use$(() => ({
        email: userStore$.email.get(),
        password: userStore$.passwordTemp.get(),
        loading: userStore$.loading.get(),
        snack: userStore$.snack.get(),
        isLogin: userStore$.isLogin.get(),
        session: userStore$.session.get(),
        first_name: userStore$.first_name.get(),
        last_name: userStore$.last_name.get(),
        office_id: userStore$.office_id.get(),
        office_role_id: userStore$.office_role_id.get(),
        officeItems: userStore$.offices.get().map((r) => ({
          label: r.uname,
          value: r.id,
        })),
        officeRoleItems: userStore$.roles.get().map((r) => ({
          label: r.name,
          value: r.id,
        })),
        passwordResetRequested: userStore$.passwordResetRequested.get(),
        passwordResetToken: userStore$.passwordResetToken.get(),
    }));

    const setEmail = userStore$.email.set;
    const setPassword = userStore$.passwordTemp.set;
    const setSnack = userStore$.snack.set;
    const setLogin = userStore$.isLogin.set;
    const setFirstName = userStore$.first_name.set;
    const setLastName = userStore$.last_name.set;
    const setOfficeId = userStore$.office_id.set;
    const setOfficeRoleId = userStore$.office_role_id.set;
    const setPasswordResetRequested = userStore$.passwordResetRequested.set;
    const setPasswordResetToken = userStore$.passwordResetToken.set;

    const handleRegister = async () => {
        userStore$.loading.set(true);

        const validation = validateUserRegister();
        if (!validation.success) {
          userStore$.snack.set(validation.message);
          console.log(validation.message)
          userStore$.loading.set(false);
          return;
        }

        const { data: { user, session }, error } = await supabase.auth.signUp({
          email: userStore$.email.get(),
          password: userStore$.passwordTemp.get(),
          options: {
            data: {
              first_name: userStore$.first_name.get(),
              last_name: userStore$.last_name.get(),
              office_id: userStore$.office_id.get(),
              office_role_id: userStore$.office_role_id.get(),
            }
          }
        });

        userStore$.loading.set(false);

        if (error) {
          userStore$.snack.set(error.message);
          console.log(error.message)
        } else if (user) {
          userStore$.session.set(session); // If Confirm email is enabled, a user is returned but session is null.
          userStore$.snack.set(t("auth.checkEmail"));
          setLogin(true);
        } 
    };

    const handleLogin = async () => {
        userStore$.loading.set(true);
      
        const { data: { session }, error } = await supabase.auth.signInWithPassword({
          email: userStore$.email.get(),
          password: userStore$.passwordTemp.get(),
        });
        userStore$.loading.set(false);
      
        if (error) {
          userStore$.snack.set(error.message);
        } else if (session) {
          // userStore$.session.set(session); // not required as handled by useAuthListener
          // router.replace("/(tabs)/settings"); // not required as handled by useAuthListener
          userStore$.snack.set(t("auth.welcomeBack"));
          userStore$.passwordTemp.set(""); // 🔐 cleanup password
        }
    }; 
    
    const handleLogout = async () => {
      userStore$.loading.set(true);
    
      const { error } = await supabase.auth.signOut()
      userStore$.loading.set(false);
    
      if (error) {
        userStore$.snack.set(error.message);
      } else {
        // userStore$.session.set(null); // not required as handled by useAuthListener
        userStore$.snack.set(t("auth.goodbye"));
        // router.replace("/"); // not required as handled by useAuthListener
      }
  }; 

  
  const handlePasswordReset = async () => {

    const validation = validateEmail()
    if (!validation.success) {
      userStore$.snack.set(validation.message);
      console.log(validation.message)
      userStore$.loading.set(false);
      return;
    }

    const email = userStore$.email.get();
    userStore$.loading.set(true);
  
    const { error } = await supabase.auth.resetPasswordForEmail(email);
  
    userStore$.loading.set(false);
  
    if (error) {
      userStore$.snack.set(error.message);
    } else {
      userStore$.passwordResetRequested.set(true);
      userStore$.passwordTemp.set(""); // 🔐 cleanup password
      userStore$.passwordResetToken.set(""); // 🔐 cleanup password reset token
      userStore$.snack.set(t("auth.checkEmailPasswordReset"));
    }
  };

  const handlePasswordUpdate = async () => {
    
    const validation = validatePasswordReset();
    if (!validation.success) {
      userStore$.snack.set(validation.message);
      console.log(validation.message)
      userStore$.loading.set(false);
      return;
    }

    userStore$.loading.set(true);

    const { data, error: sessionError } = await supabase.auth.verifyOtp({
      token_hash: userStore$.passwordResetToken.get(),
      type: 'email',
    });

    if (sessionError || !data.session) {
      console.log(sessionError)
      userStore$.loading.set(false);
      userStore$.snack.set(t("auth.invalidOrExpiredToken"));
      return;
    }

    const { error } = await supabase.auth.updateUser({ password: userStore$.passwordTemp.get() });
    userStore$.loading.set(false);

    if (error) {
      userStore$.snack.set(error.message);
    } else {
      userStore$.passwordResetRequested.set(false); // successfull reset completed
      userStore$.snack.set(t("auth.passwordResetSuccessful"));
    }
  };

    return {
        ...$,
        setEmail,
        setPassword,
        setSnack,
        setLogin,
        setFirstName,
        setLastName,
        setOfficeId,
        setOfficeRoleId,
        setPasswordResetToken,
        setPasswordResetRequested,
        handleRegister,
        handleLogin,
        handleLogout,
        handlePasswordUpdate,
        handlePasswordReset
    };
};
