export { auth as proxy } from "@/auth" 
export const config = {

  // Add matcher to protect all routes except login/api routes if desired
  // Currently protecting everything except specific public paths
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|login).*)"],
} 