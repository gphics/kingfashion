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
    // const isMgtUrl = pathname.includes("/mgt")
    if (pathname === "/mgt/deps") {
        
        return NextResponse.next()
    }
    if (mgt && pathname === "/mgt") {
        return NextResponse.redirect(new URL("/mgt/dashboard", req.url))
    }
   
    if (!mgt && pathname !== "/mgt") {
        return NextResponse.redirect(new URL("/mgt", req.url))
    }


}