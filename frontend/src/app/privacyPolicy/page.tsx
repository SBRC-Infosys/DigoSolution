import Breadcrumb from "@/components/Common/Breadcrumb";
import React from "react";

const PrivacyPolicy = () => {
  return (
    <div>
      <Breadcrumb
        pageName="Privacy Policy"
        description="
                            Welcome to Digo! This page outlines how we collect, use, and protect your personal information when you visit our website or use our services. By accessing or using our website or services, you consent to the collection and use of your personal information as described in this policy.
                        "
        animationIcons="https://lottie.host/754f1b88-2a74-4c0c-a1b8-90dcc683958f/QvyK8a6Gke.json"
      />
      <div className="container ">
        <ol className="grid  list-decimal grid-cols-2 ">
          <li className="mb-4 p-4">
            <h1 className="text-xl font-semibold"> Information We Collect</h1>
            <p className="font-bold">
              We collect the following types of information when you use our
              services:
            </p>
            <ol className="list-disc pl-4 pt-4">
              <li>
                Personal Information: This may include your name, em ail
                address, phone number, and any other personal details you
                provide to us.
              </li>
              <li>
                Usage Data: We may collect information about how you access and
                use our services, including your device’s IP address, browser
                type, and usage patterns.
              </li>
              <li>
                Cookies and Tracking Technologies: We use cookies and similar
                technologies to collect information and improve your experience
                on our website.
              </li>
            </ol>
          </li>
          <li className="mb-4 p-4">
            <h1 className="text-xl font-semibold">
              {" "}
              How We Use Your Information
            </h1>
            <p className="font-bold">
              We use the information we collect for the following purposes:
            </p>
            <ol className="list-disc pl-4 pt-4">
              <li>
                To provide, maintain, and improve our services. To communicate
                with you, respond to inquiries, and provide customer support.
              </li>
              <li>
                To personalize your experience and enhance our website’s
                functionality. To send you updates, promotional materials, or
                other communications that may be of interest to you (you may opt
                out at any time).
              </li>
            </ol>
          </li>
          <li className="mb-4 p-4">
            <h1 className="text-xl font-semibold"> Sharing Your Information</h1>
            <p className="font-bold">
              We will not share, sell, or rent your personal information to
              third parties except in the following cases:
            </p>
            <ol className="list-disc pl-4 pt-4">
              <li>
                With Service Providers: We may share your information with
                trusted third-party service providers who assist us in operating
                our business and delivering services to you.
              </li>
              <li>
                Usage Data: We may collect information about how you access and
                use our services, including your device’s IP address, browser
                type, and usage patterns.
              </li>
              <li>
                For Legal Reasons: We may disclose your information if required
                to do so by law or to protect the rights, property, or safety of
                Diago Solutions, our users, or others
              </li>
            </ol>
          </li>
          <li className="mb-4 p-4">
            <h1 className="text-xl font-semibold"> Data Security</h1>
            <p className="font-bold">
              We will not share, sell, or rent your personal information to
              third parties except in the following cases:
            </p>
            <ol className="list-disc pl-4 pt-4">
              <li>
                We take the security of your personal information seriously and
                implement industry-standard measures to protect it from
                unauthorized access, disclosure, alteration, or destruction.
              </li>
              <li>
                However, no method of transmission over the internet or
                electronic storage is completely secure, and we cannot guarantee
                absolute security.
              </li>
              <li>
                For Legal Reasons: We may disclose your information if required
                to do so by law or to protect the rights, property, or safety of
                Diago Solutions, our users, or others
              </li>
            </ol>
          </li>
          <li className="mb-4 p-4">
            <h1 className="text-xl font-semibold">Your Rights</h1>
            <p className="font-bold">You have the right to:</p>
            <ol className="list-disc pl-4 pt-4">
              <li>
                Access: Request a copy of the personal information we hold about
                you.
              </li>
              <li>
                Correction: Request that we correct any inaccuracies in your
                personal information.
              </li>
              <li>
                FDeletion: Request that we delete your personal information,
                subject to certain legal exceptions.
              </li>
              <li>
                Opt-out: Opt out of receiving marketing communications from us
                at any time.
              </li>
            </ol>
          </li>
          <li className="mb-4 p-4">
            <h1 className="text-xl font-semibold">Third-Party Links</h1>
            <p className="font-bold">
              Our website may contain links to third-party sites:
            </p>
            <ol className="list-disc pl-4 pt-4">
              <li>
                We are not responsible for the content or privacy practices of
                these external sites.
              </li>
              <li>
                We encourage you to read the privacy policies of any third-party
                websites you visit.
              </li>
            </ol>
          </li>
          <li className="mb-4 p-4">
            <h1 className="text-xl font-semibold">Changes to This Privacy</h1>
            <p className="font-bold">
              Policy We may update this Privacy Policy from time to time.
            </p>
            <ol className="list-disc pl-4 pt-4">
              <li>
                When we make changes, we will update the “Effective Date” at the
                top of this page.
              </li>
              <li>
                We encourage you to review this Privacy Policy periodically for
                any updates.
              </li>
            </ol>
          </li>
          <li className="mb-4 p-4">
            <h1 className="text-xl font-semibold">CContact Us</h1>
            <p className="font-bold">
              Policy We may update this Privacy Policy from time to time.
            </p>
            <ol className="list-disc pl-4 pt-4">
              <li>
                If you have any questions or concerns about this Privacy Policy
                or our practices, please contact us.
              </li>
            </ol>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
