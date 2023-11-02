import Tag from "@/components/common/tag";
import { IconScript } from "@tabler/icons-react";
import { ScriptBaseType } from "@type/scripts";
// import { Link } from "react-router-dom";
import Link from "next/link";
import styled from "styled-components";

type ScriptCardProps = {
  script: ScriptBaseType;
  className?: string;
};

const ScriptBar = ({ script, className }: ScriptCardProps) => {
  return (
    <Link href={`/script/${script.id}`}>
      <ScriptBarProps className={className}>
        <p>
          <IconScript className="icon" width={"1rem"} height={"1rem"} /> {script.title}
        </p>
        {script.tags.map(t => (
          <Tag tag={t} />
        ))}
      </ScriptBarProps>
    </Link>
  );
};

export default ScriptBar;

const ScriptBarProps = styled.div`
  background-color: #efefef;
  padding: 1rem;
  border-radius: 0.5rem;
  margin: 0.5rem 0rem;
  .icon {
    margin-right: 0.5rem;
  }
  .tag {
    font-size: 0.75rem;
  }
`;
