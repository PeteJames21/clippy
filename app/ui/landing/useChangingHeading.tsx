import { useEffect, useRef } from 'react';

const useChangingHeading = () => {
    const changingHeadingRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const headings = [
            "Get More Done",
            "Achieve More",
            "Master Your Time"
        ];
        let index = 0;

        const changingHeading = changingHeadingRef.current;

        if (!changingHeading) return;

        function changeHeading() {
            if (!changingHeading) return;
            changingHeading.style.opacity = '0';
            setTimeout(() => {
                if (!changingHeading) return;
                changingHeading.textContent = headings[index];
                changingHeading.style.opacity = '1';
                index = (index + 1) % headings.length;
            }, 500);
        }

        const intervalId = setInterval(changeHeading, 3000);

        return () => clearInterval(intervalId);
    }, []);

    return changingHeadingRef;
};

export default useChangingHeading;
