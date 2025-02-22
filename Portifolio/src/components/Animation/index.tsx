import Lottie from "lottie-react";
import useAnimation from "../../hooks/useAnimation"
import { AnimationType } from "../../types/AnimationType";

const Animation:React.FC <AnimationType> = ({url}) => {
    const { animationData, loading } = useAnimation(url);

    if (loading) return <p>Carregando animação...</p>;
    if (!animationData) return <p>Erro ao carregar a animação.</p>;

    return <Lottie animationData={animationData} loop autoplay style={{ maxWidth: "100%", overflow: "hidden" }} />;
}

export default Animation