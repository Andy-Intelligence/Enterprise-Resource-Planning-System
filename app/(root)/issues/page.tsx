"use client"
import React from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import IssueCard from "@/components/IssueCard";

interface Issue {
  id: number;
  status: string;
}

const IssuesComponent = () => {
  const router = useRouter();

  // Dummy data representing issues with IDs
  const issues:any = [
    { id: 1, status: "To Do" },
    { id: 2, status: "In Progress" },
    { id: 3, status: "Completed" },
    { id: 4, status: "Completed" },
    { id: 5, status: "Cancelled" },
    { id: 5, status: "Cancelled" },
  ];

  const handleCardClick = (id: number) => {
    router.push(`/issue/${id}`);
  };

  // Group issues by status
  const groupedIssues: any = issues.reduce(
    (acc:any, issue:any) => {
      acc[issue.status] = [...(acc[issue.status] || []), issue];
      return acc;
    },
    {}
  );

  return (
    <div className="container mx-auto p-4">
      <div className="text-3xl font-bold mb-4">Issues</div>
      <div className="flex justify-end mb-4">
        <input
          type="text"
          placeholder="Search"
          className="px-4 py-2 border rounded-md"
        />
      </div>
      <div className="flex justify-between mb-4">
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md"
          onClick={() => router.push("/tasks/create")}
        >
          Create
        </button>
        <div className="pagination">Pagination</div>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {Object.entries(groupedIssues).map(([status, issues]:[any,any]) => (
          <div key={status} className="flex flex-col gap-y-2">
            <h2 className="text-lg font-bold mb-4">{status}</h2>
            {issues.map((issue:any) => (
              <Link key={issue.id} href={`/issues/${issue.id}`}>
                {/* <a> */}
                  <IssueCard />
                {/* </a> */}
              </Link>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default IssuesComponent;
