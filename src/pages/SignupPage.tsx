
import { Layout } from "@/components/layout/Layout";
import { SignupForm } from "@/components/auth/SignupForm";

export default function SignupPage() {
  return (
    <Layout>
      <div className="container py-12">
        <SignupForm />
      </div>
    </Layout>
  );
}
