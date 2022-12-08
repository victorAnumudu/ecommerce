const config = () => {
  let apiUrl =
    process.env.NODE_ENV == "development"
      ? "http://localhost:5000/api"
      : "https://ecommerce-9dlc.onrender.com/api";
  return apiUrl;
};
export default config();

export const PaystackPublicKey =
  "pk_test_d0396864c21694552f9c379ace9244f3633227bb";
