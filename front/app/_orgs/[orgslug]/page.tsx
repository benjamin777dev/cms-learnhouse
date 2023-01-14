"use client";
import { useRouter, useSearchParams, useSelectedLayoutSegment } from "next/navigation";
import Layout from "../../../components/UI/Layout";
import { Title } from "../../../components/UI/Elements/Styles/Title";
import { Header } from "../../../components/UI/Header";
import Link from "next/link";
import { usePathname } from "next/navigation";

const OrgHomePage = (params: any) => {
  const orgslug = params.params.orgslug;
  const pathname = usePathname();

  return (
    <div>
      <Title>Welcome {orgslug} 👋🏻</Title>
      <Link href={pathname + "/courses"}>
        <button>See Courses </button>
      </Link>
    </div>
  );
};

export default OrgHomePage;
