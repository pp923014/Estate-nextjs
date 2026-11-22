import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { Admin } from "@/models";
import { createSession } from "@/lib/auth";
export async function POST(request) {
    try {
        const { email, password } = await request.json();
        if (
            typeof email !== "string" ||
            typeof password !== "string" ||
            password.length > 200
        )
            return NextResponse.json(
                { success: false, message: "Invalid credentials." },
                { status: 400 },
            );
        await connectDB();
        const admin = await Admin.findOne({ email: email.toLowerCase().trim() });
        if (!admin || !(await bcrypt.compare(password, admin.passwordHash)))
            return NextResponse.json(
                { success: false, message: "Email or password is incorrect." },
                { status: 401 },
            );
        await createSession(admin);
        return NextResponse.json({ success: true });
    } catch (error) {
        console.error("ADMIN_LOGIN_ERROR:", error);

        return NextResponse.json(
            {
                success: false,
                message: "Unable to sign in. Check server configuration."
            },
            { status: 500 }
        );
    }
}
