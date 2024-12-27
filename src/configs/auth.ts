const authConfig = {
    meEndpoint: "/api/v2/employees/me",
    loginEndpoint: "/api/auth/login",
    registerEndpoint: "/jwt/register",
    storageTokenKeyName: "accessToken",
    onTokenExpiration: "refreshToken" as "logout" | "refreshToken", // logout | refreshToken
  };
  
  export default authConfig;
  