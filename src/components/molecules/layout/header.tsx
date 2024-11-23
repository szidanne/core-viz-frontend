import React, { useMemo } from "react";
import { Header as AntHeader } from "antd/es/layout/layout";
import { classNames } from "@/theme/classNames";
import Typography from "@/components/atoms/typography";
import RoundedButton from "@/components/atoms/rounded-button";
import { useTheme } from "@/context/ThemeContext";
import { IoMdMoon } from "react-icons/io";
import { FiSun } from "react-icons/fi";

const Header: React.FC = () => {
  const { toggleTheme, theme } = useTheme();
  const themeIcon = useMemo(
    () => (theme === "dark" ? <IoMdMoon /> : <FiSun />),
    [theme],
  );
  return (
    <AntHeader
      className={`bg-light-background dark:bg-dark-background border-b border-french-gray border-opacity-40 flex items-center justify-center ${classNames.horizontalPadding}`}
    >
      <div
        className={`flex items-center justify-between w-full ${classNames.maxWidth}`}
      >
        <Typography size="small">
          Core<span className="font-semibold">Viz</span>
        </Typography>
        <RoundedButton icon={themeIcon} onClick={toggleTheme} />
      </div>
    </AntHeader>
  );
};

export default Header;
