<script setup lang="ts">
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const isLoading = ref(false);
const errorMessage = ref('');
const registerForm = ref({
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
  terms: false
});

const passwordMatch = computed(() => {
  return registerForm.value.password === registerForm.value.confirmPassword;
});

async function handleRegister() {
  try {
    if (!passwordMatch.value) {
      errorMessage.value = 'Passwords do not match';
      return;
    }
    
    if (!registerForm.value.terms) {
      errorMessage.value = 'Please accept the terms and conditions';
      return;
    }

    isLoading.value = true;
    // TODO: Add Firebase registration logic here
    // const result = await createUserWithEmailAndPassword(auth, registerForm.value.email, registerForm.value.password);
    // await updateProfile(result.user, { displayName: registerForm.value.fullName });
    
    router.push('/home');
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
        <h2 class="card-title text-2xl font-bold text-center text-primary mb-6">Create Account</h2>
        
        <!-- Error Alert -->
        <div v-if="errorMessage" class="alert alert-error shadow-lg mb-4">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" class="stroke-current flex-shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
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
              :class="{ 'input-error': registerForm.confirmPassword && !passwordMatch }"
              required
            />
            <label class="label" v-if="registerForm.confirmPassword && !passwordMatch">
              <span class="label-text-alt text-error">Passwords do not match</span>
            </label>
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
              <span class="label-text">I agree to the <a href="#" class="link link-primary">Terms and Conditions</a></span>
            </label>
          </div>

          <!-- Submit Button -->
          <button 
            type="submit" 
            class="btn btn-primary w-full"
            :class="{ 'loading': isLoading }"
            :disabled="isLoading || !passwordMatch"
          >
            {{ isLoading ? 'Creating account...' : 'Create Account' }}
          </button>

          <!-- Sign In Link -->
          <div class="text-center text-sm">
            <span class="text-base-content">Already have an account? </span>
            <router-link to="/login" class="link link-primary">Sign in</router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>