import Carousel from "@components/carousel";
import { MainLayout } from "@components/layout";
import { Container, ContainerFluid } from "@components/common/Grid";

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (
    <MainLayout>
      <ContainerFluid className="pd-none">
        <Carousel />
      </ContainerFluid>
      {/* <Container>Loading....</Container> */}
    </MainLayout>
  );
}
