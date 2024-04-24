"use client";

import { Footer } from "flowbite-react";

export default function MyFooter() {
  return (
    <Footer container className="hidden md:flex ml-[20px] mr-[45px]">
      <Footer.Copyright href="/gigme/social" by="GigMeup™" year={2022} />
      <Footer.LinkGroup>
        <Footer.Link href="/gigme/about">About</Footer.Link>
        <Footer.Link href="/gigme/privacy">Privacy Policy</Footer.Link>
        <Footer.Link href="/gigme/licencing">Licensing</Footer.Link>
        <Footer.Link href="/gigme/contact">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}
