"use client";
import Link from "next/link";
import React from "react";
import { IoChatbubblesOutline } from "react-icons/io5";
import { TbWorld } from "react-icons/tb";

interface QuickLinkProp {
  text: string;
  href: string;
}

interface QuickLinkArr {
  arr: QuickLinkProp[];
}

const QuickLink = ({ arr }: QuickLinkArr) => {
  return (
    <div className="flex items-center justify-between w-full bg-black-2">
      <div className="  text-white  text-sm flex items-center justify-start gap-3 p-1">
        {arr.map((item, index) => {
          return (
            <Link key={index} href={item?.href}>
              {item?.text}
            </Link>
          );
        })}
      </div>
      <div className="flex items-center justify-end gap-3 p-1 text-white text-sm">
        <div className="flex items-center justify-center">
          <TbWorld />
          <span>10</span>
        </div>
        <div className="flex items-center justify-center">
          <IoChatbubblesOutline />
        </div>
        <div className="flex items-center justify-center"> SuperAdmin</div>
      </div>
    </div>
  );
};

export default QuickLink;
