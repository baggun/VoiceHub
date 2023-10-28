import { Highlight, Sub } from "./ContestDeadline.styled";

const ContestDeadline = ({ deadline }: { deadline: any }) => {
    const formatTimeUnit = (value: number, unit: string) => {
        if (value) {
            return (
                <>
                    <Highlight>{value}</Highlight> {unit}{" "}
                </>
            );
        }
        return null;
    };

    if (deadline === undefined) return <div>마감되었습니다.</div>;

    return (
        <div>
            <Sub>마감까지</Sub>
            {formatTimeUnit(deadline.days, "일")}
            {formatTimeUnit(deadline.hours, "시간")}
            {formatTimeUnit(deadline.minutes, "분")}
            남았습니다.
        </div>
    );
};

export default ContestDeadline;