import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// export default function middleware(req: NextRequest) {
//     const { pathname } = req.nextUrl
//     const mgt = req.cookies.get("mgt")
//     const isMgtUrl = pathname.includes("/mgt")
//     if (isMgtUrl) {
//         if (mgt && pathname === "/mgt") {
//             return NextResponse.redirect(new URL("/mgt/dashboard", req.url))
//         }
//         if (!mgt && pathname !== "/mgt") {
//             return NextResponse.redirect(new URL("/mgt", req.url))
//         }
//     }

// }

export const config = {
    matcher: "/mgt/:path*"
}

export default function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl
    // console.log(pathname)
    const mgt = req.cookies.get("mgt")
    // because the login route is inside mgt/deps and all request to /mgt would be blovked
    // if there is no mgt cookie, so i created this middleware
    if (pathname === "/mgt/deps") {
        return NextResponse.next()
    }
    // if the admin user is already logged in and he still want to visit the login page
    // i rejected him here
    if (mgt && pathname === "/mgt") {
        return NextResponse.redirect(new URL("/mgt/dashboard", req.url))
    }
    // preventing non-mgt user from accessing this route
    if(!mgt && pathname.includes("/mgt")){
        return NextResponse.redirect(new URL("/", req.url))
    }
   // I forgot my intention for this code
    // if (!mgt && pathname !== "/mgt") {
    //     return NextResponse.redirect(new URL("/mgt", req.url))
    // }


}
