const { Resend } = require("resend");

const resend = new Resend(process.env.RESEND_API_KEY);

async function sendResetPasswordEmail(email, resetLink) {
  try {
    const { data, error } = await resend.emails.send({
      from: "Oriv AI <onboarding@resend.dev>",
      to: email,
      subject: "Reset your Oriv AI password",

      html: `
      <div style="font-family:Arial;padding:30px">

        <h2>Reset Password</h2>

        <p>Hello,</p>

        <p>You requested to reset your password.</p>

        <a
          href="${resetLink}"
          style="
            display:inline-block;
            margin-top:20px;
            padding:12px 20px;
            background:#7c3aed;
            color:white;
            text-decoration:none;
            border-radius:8px;
          "
        >
          Reset Password
        </a>

        <p style="margin-top:30px;color:#666">
          This link expires in 15 minutes.
        </p>

      </div>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  } catch (err) {
    console.error("Resend Error:", err);

    throw err;
  }
}

module.exports = {
  sendResetPasswordEmail,
};