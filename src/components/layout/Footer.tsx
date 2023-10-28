import styled from "styled-components";
import { Container } from "@common/Grid";
import LogoButton from "@components/common/button/LogoButton";

const Footer = () => {
    return (
        <FooterStyle>
            <FooterNavBar>
                <Container>
                    <LogoButton/>
                </Container>
            </FooterNavBar>
            <FooterNavBar>
                <Container>
                    <FooterCompanyDesc>
                        (주) 보이스허브 (대표이사:---) | 서울특별시 --구 ----로 ---- ----- ---- | 통신판매번호 : 0000-0000-0000
                        <br/>
                        유료직업소개사업등록번호 : (국내) 제0000-000000-00-0000000-00호 | 사업자등록번호 : 000-0000-000 | 00-000-0000
                        <br/>
                        © VoiceHub, Inc.
                    </FooterCompanyDesc>
                </Container>
            </FooterNavBar>
        </FooterStyle>
    )
}

const FooterStyle = styled.footer`
    margin-top: 25rem;
    background-color: white;
    padding-bottom: 4rem;
`;
const FooterNavBar = styled.div`
    display: flex;
    padding: 2rem 0rem;
    border-top: 1px solid rgb(235, 235, 235);
    border-bottom: 1px solid rgb(235, 235, 235);
`;
const FooterCompanyDesc = styled.p`
    font-size: .75rem;
    color: #a1a1a1;
`;

export default Footer;