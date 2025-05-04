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

function validatePasswordReset(): { success: true } | { success: false; message: string } {
  const result = userSignUpSchema.safeParse({
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
        }))
    }));

    const setEmail = userStore$.email.set;
    const setPassword = userStore$.passwordTemp.set;
    const setSnack = userStore$.snack.set;
    const setLogin = userStore$.isLogin.set;
    const setFirstName = userStore$.first_name.set;
    const setLastName = userStore$.last_name.set;
    const setOfficeId = userStore$.office_id.set;
    const setOfficeRoleId = userStore$.office_role_id.set;

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
          userStore$.passwordTemp.set(""); // do not save password
          userStore$.session.set(session); // If Confirm email is enabled, a user is returned but session is null.
          userStore$.snack.set(t("auth.checkEmail"));
          setLogin(true);
        } 
    };

    const handlePasswordReset = async () => {
      const email = userStore$.email.get();
      userStore$.loading.set(true);
    
      if (!email || !email.includes("@")) {
        userStore$.snack.set(t("auth.invalidEmail"));
        userStore$.loading.set(false);
        return;
      }
    
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: "otobotx://reset-password", // change if you're using hosted web
      });
    
      userStore$.loading.set(false);
    
      if (error) {
        console.error("🔒 Password reset error:", error.message);
        userStore$.snack.set(error.message);
      } else {
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
      const { error } = await supabase.auth.updateUser({ password: userStore$.passwordTemp.get() });
      userStore$.loading.set(false);
  
      if (error) {
        userStore$.snack.set(error.message);
      } else {
        userStore$.snack.set(t("auth.passwordResetSuccessful"));
        router.replace("/(auth)/register");
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
        handleRegister,
        handleLogin,
        handleLogout,
        handlePasswordReset,
        handlePasswordUpdate
    };
};
