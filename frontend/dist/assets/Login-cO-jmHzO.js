import{u as x,j as e}from"./index-DP1eCpkD.js";import{r,u as b}from"./react-vendor-CleJxUt9.js";import"./icon-vendor-pyVlVHJ0.js";const v=()=>{const[n,i]=r.useState(""),[l,c]=r.useState(""),[o,a]=r.useState(null),{login:d,loginWithGoogle:u,loginWithApple:m}=x(),s=b(),g=async t=>{t.preventDefault(),a(null);try{await d(n,l),s("/settings")}catch{a("Login failed. Please check your credentials.")}},h=async()=>{try{await u(),s("/settings")}catch{a("Google login failed. Please try again.")}},p=async()=>{try{await m(),s("/settings")}catch{a("Apple login failed. Please try again.")}};return e.jsxs("div",{className:"bg-white shadow-md rounded-lg p-8 max-w-md mx-auto",children:[e.jsx("h2",{className:"text-2xl font-semibold mb-6 text-center",children:"Log In"}),o&&e.jsx("p",{className:"text-red-500 text-center mb-4",children:o}),e.jsxs("form",{onSubmit:g,children:[e.jsx("input",{type:"email",value:n,onChange:t=>i(t.target.value),placeholder:"Email",required:!0,className:"w-full mb-4 p-3 border rounded-lg"}),e.jsx("input",{type:"password",value:l,onChange:t=>c(t.target.value),placeholder:"Password",required:!0,className:"w-full mb-4 p-3 border rounded-lg"}),e.jsx("button",{type:"submit",className:"btn btn-primary w-full",children:"Log In"})]}),e.jsx("div",{className:"my-4 flex items-center justify-center",children:e.jsx("span",{className:"text-gray-500",children:"or"})}),e.jsx("button",{onClick:h,className:"btn btn-primary w-full bg-red-500 hover:bg-red-600",children:"Log In with Google"}),e.jsx("button",{onClick:p,className:"btn btn-primary w-full bg-black hover:bg-gray-800 mt-4",children:"Log In with Apple"}),e.jsxs("p",{className:"mt-4 text-center",children:["Don’t have an account?"," ",e.jsx("a",{href:"/signup",className:"text-blue-500 hover:underline",children:"Sign Up"})]})]})};export{v as default};
