<script setup lang="ts">
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { auth } from "../lib/firebase";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { db, storage } from "../lib/firebase";
import { setDoc, doc } from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const router = useRouter();
const isLoading = ref(false);
const errorMessage = ref("");
const registerForm = ref({
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
  terms: false,
});
const photoFile = ref<File | null>(null);

const passwordMatch = computed(() => {
  return registerForm.value.password === registerForm.value.confirmPassword;
});

function handlePhotoChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    photoFile.value = target.files[0];
  } else {
    photoFile.value = null;
  }
}

async function handleRegister() {
  try {
    if (!passwordMatch.value) {
      errorMessage.value = "Passwords do not match";
      return;
    }

    if (!registerForm.value.terms) {
      errorMessage.value = "Please accept the terms and conditions";
      return;
    }

    isLoading.value = true;

    const result = await createUserWithEmailAndPassword(
      auth,
      registerForm.value.email,
      registerForm.value.password
    );

    if (!result || !result.user) {
      errorMessage.value = "User registration failed. Please try again.";
      return;
    }

    let photoURL = "";
    if (photoFile.value) {
      const filePath = `users/${result.user.uid}/profile.jpg`;
      const fileRef = storageRef(storage, filePath);
      await uploadBytes(fileRef, photoFile.value);
      photoURL = await getDownloadURL(fileRef);
    }

    await updateProfile(result.user, {
      displayName: registerForm.value.fullName,
      photoURL: photoURL || undefined,
    });

    // Add user to Firestore
    await setDoc(doc(db, "users", result.user.uid), {
      uid: result.user.uid,
      fullName: registerForm.value.fullName,
      email: registerForm.value.email,
      photoURL: photoURL || "",
      createdAt: new Date(),
    });

    router.push("/home");
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}

// --- Google Sign Up ---
async function handleGoogleSignUp() {
  try {
    isLoading.value = true;
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);

    if (!result.user) {
      errorMessage.value = "Google sign up failed. Please try again.";
      return;
    }

    // Check if user doc exists, if not, create it
    const userDocRef = doc(db, "users", result.user.uid);
    await setDoc(
      userDocRef,
      {
        uid: result.user.uid,
        fullName: result.user.displayName || "",
        email: result.user.email || "",
        photoURL: result.user.photoURL || "",
        createdAt: new Date(),
      },
      { merge: true }
    );

    router.push("/home");
  } catch (error: any) {
    errorMessage.value = error.message;
  } finally {
    isLoading.value = false;
  }
}
</script>

<template>
  <div class="min-h-screen flex items-center justify-center px-4">
    <div class="card w-full max-w-md bg-base-100 shadow-xl">
      <div class="card-body">
        <h2 class="card-title text-2xl font-bold text-center text-primary mb-6">
          Create Account
        </h2>

        <!-- Error Alert -->
        <div v-if="errorMessage" class="alert alert-error shadow-lg mb-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="stroke-current flex-shrink-0 h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>{{ errorMessage }}</span>
          </div>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <!-- Full Name Input -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Full Name</span>
            </label>
            <input
              v-model="registerForm.fullName"
              type="text"
              placeholder="John Doe"
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Email Input -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Email</span>
            </label>
            <input
              v-model="registerForm.email"
              type="email"
              placeholder="email@example.com"
              class="input input-bordered w-full"
              required
            />
          </div>

          <!-- Password Input -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Password</span>
            </label>
            <input
              v-model="registerForm.password"
              type="password"
              placeholder="••••••••"
              class="input input-bordered w-full"
              required
              minlength="8"
            />
            <label class="label">
              <span class="label-text-alt">At least 8 characters</span>
            </label>
          </div>

          <!-- Confirm Password Input -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Confirm Password</span>
            </label>
            <input
              v-model="registerForm.confirmPassword"
              type="password"
              placeholder="••••••••"
              class="input input-bordered w-full"
              :class="{
                'input-error': registerForm.confirmPassword && !passwordMatch,
              }"
              required
            />
            <label
              class="label"
              v-if="registerForm.confirmPassword && !passwordMatch"
            >
              <span class="label-text-alt text-error"
                >Passwords do not match</span
              >
            </label>
          </div>

          <!-- Photo Upload -->
          <div class="form-control">
            <label class="label">
              <span class="label-text">Profile Photo (optional)</span>
            </label>
            <input
              type="file"
              accept="image/*"
              @change="handlePhotoChange"
              class="file-input file-input-bordered w-full"
            />
          </div>

          <!-- Terms and Conditions -->
          <div class="form-control">
            <label class="label cursor-pointer justify-start gap-3">
              <input
                v-model="registerForm.terms"
                type="checkbox"
                class="checkbox checkbox-primary"
                required
              />
              <span class="label-text"
                >I agree to the
                <a href="#" class="link link-primary"
                  >Terms and Conditions</a
                ></span
              >
            </label>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            class="btn btn-primary w-full"
            :class="{ loading: isLoading }"
            :disabled="isLoading || !passwordMatch"
          >
            {{ isLoading ? "Creating account..." : "Create Account" }}
          </button>

          <!-- Google Sign Up Button -->
          <div class="divider">or</div>
          <button
            class="btn btn-outline btn-primary w-full"
            :disabled="isLoading"
            @click="handleGoogleSignUp"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-6"
              viewBox="0 0 48 48"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Sign up with Google
          </button>

          <!-- Sign In Link -->
          <div class="text-center text-sm">
            <span class="text-base-content">Already have an account? </span>
            <router-link to="/" class="link link-primary">Sign in</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
