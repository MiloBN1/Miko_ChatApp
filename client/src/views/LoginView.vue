<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
    };
  },
  methods: {
    onLogin() {
      // Логика входа
      console.log('Вход:', this.form);
      // Например, отправка данных на сервер через axios или fetch
    },
  },
};
</script>


<template>
  <div class="h-[100vh] flex items-center justify-center">
    <div class="login-card typography">
      <h1 class="font-bold text-2xl">Login to your account</h1>
      <div class="flex flex-col mt-5">
        <label>Email</label>
        <input class="mt-2" placeholder="Email" required />
      </div>
      <div class="flex flex-col mt-4">
        <div class="flex justify-between">
          <label>Password</label>
          <a class="a-link">Forgot ?</a>
        </div>
        <input class="mt-2" placeholder="Enter your password" required />
      </div>
      <button class="w-full py-3 main-btn mt-5">Login</button>
      <button class="flex w-full justify-center gap-2 py-3 google-btn mt-3">
        <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clip-path="url(#clip0_503_217)">
            <path d="M20.3051 10.2303C20.3051 9.55056 20.2499 8.86711 20.1324 8.19836H10.7V12.0492H16.1015C15.8773 13.2911 15.1572 14.3898 14.1026 15.0879V17.5866H17.3251C19.2174 15.8449 20.3051 13.2728 20.3051 10.2303Z" fill="#4285F4"/>
            <path d="M10.7 20.0006C13.397 20.0006 15.6715 19.1151 17.3287 17.5865L14.1062 15.0879C13.2096 15.6979 12.0522 16.0433 10.7037 16.0433C8.0948 16.0433 5.88279 14.2832 5.08911 11.9169H1.76373V14.4927C3.46133 17.8695 6.91898 20.0006 10.7 20.0006Z" fill="#34A853"/>
            <path d="M5.08549 11.917C4.66661 10.675 4.66661 9.3302 5.08549 8.08824V5.51245H1.76379C0.345459 8.3381 0.345459 11.6671 1.76379 14.4928L5.08549 11.917Z" fill="#FBBC04"/>
            <path d="M10.7 3.95805C12.1257 3.936 13.5036 4.47247 14.5361 5.45722L17.3911 2.60218C15.5833 0.904587 13.1839 -0.0287217 10.7 0.000673888C6.91898 0.000673888 3.46133 2.13185 1.76373 5.51234L5.08543 8.08813C5.87544 5.71811 8.09113 3.95805 10.7 3.95805Z" fill="#EA4335"/>
          </g>
          <defs>
            <clipPath id="clip0_503_217">
              <rect width="20" height="20" fill="white" transform="translate(0.5)"/>
            </clipPath>
          </defs>
        </svg>
        Continue with Google</button>
      <p class="mt-3 text-center">Don't have an account? <a class="a-link">create it</a></p>
    </div>
  </div>
</template>


<style scoped>

  .login-card {
    padding: 48px 72px;
    box-shadow:0 40px 40px -10px rgba(228, 230, 234, 0.74);
    width: 540px;
    border-radius: 20px;
    background-color: #fff;
  }


  input{
    border: 1px solid #D0D5DD;
  }

  .google-btn{
    background-color: #D1E9FF;
    color: #4285F4;
    border-radius: 8px;
  }

  p{
    color: #98A2B3;
  }

</style>
