"use client";
import React from "react";
import { ConfigProvider, Layout, theme as antdTheme } from "antd";
import { Content, Footer } from "antd/es/layout/layout";
import { useTheme } from "@/context/theme-context";
import Typography from "@/components/atoms/typography";
import { classNames } from "@/theme/classNames";
import Header from "@/components/molecules/layout/header";

interface PageTemplateProps extends Template {}

const PageTemplate: React.FC<PageTemplateProps> = ({ children }) => {
  const { theme } = useTheme();
  return (
    <ConfigProvider
      theme={{
        algorithm:
          theme === "dark"
            ? antdTheme.darkAlgorithm
            : antdTheme.defaultAlgorithm,
      }}
    >
      <Layout className="min-h-screen">
        <Header />
        <Content className="h-full bg-light-surface dark:bg-dark-surface">
          {children}
        </Content>
        <Footer
          className={` "bg-light-background dark:bg-dark-background border-t border-french-gray border-opacity-40 ${classNames.horizontalPadding}`}
        >
          <Typography>Footer</Typography>
        </Footer>
      </Layout>
    </ConfigProvider>
  );
};

export default PageTemplate;
