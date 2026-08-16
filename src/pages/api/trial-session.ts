import type { NextApiRequest, NextApiResponse } from 'next';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

type ResponseData = {
  success?: boolean;
  message?: string;
  error?: string;
};

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>,
) => {
  if (req.method !== 'POST') {
    return res.status(405).json({
      error: 'Method not allowed',
    });
  }

  try {
    const {
      name,
      phone,
      country,
      course,
      trialType,
      additionalInfo,
    } = req.body;

    if (!name || !phone || !country || !course || !trialType) {
      return res.status(400).json({
        error: 'Please complete all required fields.',
      });
    }

    const courseNames: Record<string, string> = {
      general: 'General English',
      ielts: 'IELTS Preparation',
      toefl: 'TOEFL Preparation',
    };

    const trialNames: Record<string, string> = {
      level: '20-minute Level Assessment',
      full: '20-minute Level Assessment + 40-minute Free Trial Lesson',
    };

    const emailResult = await resend.emails.send({
      from: 'Naderi English <onboarding@resend.dev>',
      to: [process.env.TRIAL_SESSION_EMAIL as string],
      subject: `New Trial Session Request - ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 650px; margin: 0 auto; color: #333;">
          <h1 style="color: #0398dc;">
            New Trial Session Request
          </h1>

          <p>
            Someone has requested a trial session through your website.
          </p>

          <hr style="margin: 25px 0;" />

          <h2>Student Information</h2>

          <p>
            <strong>Full Name:</strong><br />
            ${name}
          </p>

          <p>
            <strong>Phone Number:</strong><br />
            ${phone}
          </p>

          <p>
            <strong>Country of Residence:</strong><br />
            ${country}
          </p>

          <p>
            <strong>Course:</strong><br />
            ${courseNames[course] || course}
          </p>

          <p>
            <strong>Trial Session:</strong><br />
            ${trialNames[trialType] || trialType}
          </p>

          <p>
            <strong>Additional Information:</strong><br />
            ${additionalInfo || 'No additional information provided.'}
          </p>

          <hr style="margin: 25px 0;" />

          <p style="color: #777;">
            This request was submitted through the Naderi English website.
          </p>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error(emailResult.error);

      return res.status(500).json({
        error: 'Unable to send the email.',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Trial session request sent successfully.',
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      error: 'Something went wrong while sending your request.',
    });
  }
};

export default handler;
