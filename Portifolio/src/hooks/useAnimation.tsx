import { useEffect, useState } from "react";

const useAnimation = (animationUrl: string) => {
    const [animationData, setAnimationData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(animationUrl)
            .then((res) => res.json())
            .then((data) => {
                setAnimationData(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [animationUrl]);

    return { animationData, loading };
};

export default useAnimation;