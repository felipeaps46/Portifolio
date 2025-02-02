import Lottie from "lottie-react";
import useAnimation from "../../hooks/useAnimation"

const Animation = ({animationUrl}) => {
    const { animationData, loading } = useAnimation(animationUrl);

    if (loading) return <p>Carregando animação...</p>;
    if (!animationData) return <p>Erro ao carregar a animação.</p>;

    return <Lottie animationData={animationData} loop autoplay style={{ maxWidth: "100%" }} />;
}

export default Animation