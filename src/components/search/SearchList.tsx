import { AudioFileBar } from "@components/audio/AudioFile";
import ProfileCard from "@components/profile/ProfileCard";
import ScriptBar from "@components/script/ScriptBar";
import { IconHeadphones, IconScript, IconUser } from "@tabler/icons-react";
import { ScriptBaseType } from "@type/scripts";
import { UserData } from "@type/user";
import { VoiceInfo } from "@type/voice";
import styled from "styled-components";

const iconProps = {
    className: "icon",
    strokeWidth: 1.25,
    height: "0.75rem",
    width: "0.75rem",
};

export const VoiceList = ({ voices }: { voices: VoiceInfo[] }) => {
    return (
        <ResultWrapper>
            <SearchLabel>
                <IconHeadphones {...iconProps} /> 목소리
            </SearchLabel>
            {voices.length > 0 ? (
                voices.map((voice) => (
                    <AudioFileBar
                        key={voice.id}
                        audioSrc={voice.url}
                        userId={voice.ownerID}
                        audioId={voice.id}
                        info={{ ...voice }}
                    />
                ))
            ) : (
                <Empty>검색결과 없음</Empty>
            )}
        </ResultWrapper>
    );
};

export const ScriptList = ({ scripts }: { scripts: ScriptBaseType[] }) => {
    return (
        <ResultWrapper>
            <SearchLabel>
                <IconScript {...iconProps} /> 대사
            </SearchLabel>
            {scripts.length > 0 ? (
                scripts?.map((script) => (
                    <ScriptBar key={script.id} script={script} />
                ))
            ) : (
                <Empty>검색결과 없음</Empty>
            )}
        </ResultWrapper>
    );
};

export const UserList = ({ users }: { users: UserData[] }) => {
    return (
        <ResultWrapper>
            <SearchLabel>
                <IconUser {...iconProps} /> 성우
            </SearchLabel>
            {users.length > 0 ? (
                users?.map((user) => (
                    <ProfileCard
                        key={`search-user-${user.id}`}
                        {...user}
                        isFollowed={true}
                        size="sm"
                    />
                ))
            ) : (
                <Empty>검색결과 없음</Empty>
            )}
        </ResultWrapper>
    );
};

const ResultWrapper = styled.div`
    margin-bottom: 2rem;
`;
const SearchLabel = styled.h4`
    font-size: 1rem;
`;
const Empty = styled.div`
    color: ${({ theme }) => theme.colors.grey};
    margin: 0.5rem 0rem;
    font-size: 1rem;
`;
