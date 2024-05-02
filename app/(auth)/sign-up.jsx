import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "../../constants";
import FormField from "../../components/FormField";
import CustomButton from "../../components/CustomButton";
import { Link, router } from "expo-router";
import { createUser } from "../../lib/appwrite";
import { useGlobalContext } from "../../context/GlobalProvider";

const SignUp = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { setUser, setIsLoggedIn } = useGlobalContext();

  const submit = async () => {
    if (form.email === "" || form.username === "" || form.password === "") {
      Alert.alert("Error ", "Please fill all required fields");
    }

    setIsSubmitting(true);

    try {
      const result = await createUser(form.email, form.password, form.username);
      // Save result to global state using context
      setUser(result);
      setIsLoggedIn(true);

      router.replace("/home");
    } catch (error) {
      Alert.alert("Error ", error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <ScrollView>
        <View className="w-full justify-center min-h-[70vh] px-4 my-6">
          <Image
            source={images.logo}
            resizeMode="contain"
            className="w-[115px] h-[35px]"
          />
          <Text className="text-2xl text-semibold font-psemibold text-white mt-10">
            Sign up to Aora
          </Text>

          <FormField
            title="Username"
            value={form.username}
            handleChangeText={(e) => setForm({ ...form, username: e })}
            otherStyles="mt-10"
          />
          <FormField
            title="Email"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            otherStyles="mt-7"
            keyBoardType="email-address"
          />

          <FormField
            title="Password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            otherStyles="mt-7"
          />
          <CustomButton
            title={"Sign Up"}
            handlePress={submit}
            contentContainerStyle={"mt-7"}
            isLoading={isSubmitting}
          />
        </View>

        <View className="justify-center pt-1 flex-row gap-2">
          <Text className="text-lg text-gray-100 font-pregular">
            Already have an account?
          </Text>
          <Link
            href={"/sign-in"}
            className="text-secondary font-psemibold text-lg"
          >
            Sign In
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SignUp;
