import PageTemplate from "@/components/templates/page-template";
import HeroSection from "@/components/molecules/sections/hero-section";
import DemoSection from "@/components/molecules/sections/demo-section";
import KeyFeaturesSection from "@/components/molecules/sections/key-features-section";
import UserWorkflowsSection from "@/components/molecules/sections/user-workflow-section";
import { ConfigProvider } from "antd";

export default function Home() {
  return (
    <PageTemplate>
      <ConfigProvider
        theme={{
          components: {
            Button: {
              defaultBg: "#ffffff33",
            },
          },
        }}
      >
        <HeroSection />
        <DemoSection />
        <KeyFeaturesSection />
        <UserWorkflowsSection />
      </ConfigProvider>
    </PageTemplate>
  );
}
