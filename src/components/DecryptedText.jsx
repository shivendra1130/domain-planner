import { useState, useEffect } from "react";
import { motion } from "framer-motion";

/**
 * DecryptedText
 * Scrambles text and decrypts it to the final string.
 */
export default function DecryptedText({
    text,
    speed = 50,
    maxIterations = 10,
    sequential = false,
    revealDirection = "start",
    useOriginalCharsOnly = false,
    characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZadcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+",
    className = "",
    parentClassName = "",
    encryptedClassName = "",
    animateOn = "hover", // 'view' or 'hover'
    ...props
}) {
    const [displayText, setDisplayText] = useState(text);
    const [isHovering, setIsHovering] = useState(false);
    const [isScrambling, setIsScrambling] = useState(false);
    const [revealedIndices, setRevealedIndices] = useState(new Set());

    useEffect(() => {
        let interval;
        let currentIteration = 0;

        if (isScrambling) {
            interval = setInterval(() => {
                setDisplayText((prevText) => {
                    return text
                        .split("")
                        .map((char, index) => {
                            if (char === " ") return " ";

                            if (revealedIndices.has(index)) {
                                return text[index];
                            }

                            return characters[Math.floor(Math.random() * characters.length)];
                        })
                        .join("");
                });

                currentIteration++;

                if (sequential) {
                    if (revealDirection === "start") {
                        const newRevealed = new Set(revealedIndices);
                        // Reveal a few characters each step
                        if (currentIteration % 5 === 0) {
                            // Logic to reveal sequentially from start
                            // Simplified for now to random reveal for better effect usually
                        }
                    }
                }

                // Simple random reveal logic for robustness
                if (currentIteration >= maxIterations) {
                    clearInterval(interval);
                    setDisplayText(text);
                    setIsScrambling(false);
                } else {
                    // Randomly reveal some characters as we go to make it converge
                    setRevealedIndices(prev => {
                        const next = new Set(prev);
                        text.split('').forEach((_, idx) => {
                            if (Math.random() > 0.9) next.add(idx);
                        });
                        if (currentIteration > maxIterations * 0.8) {
                            // Force reveal towards end
                            text.split('').forEach((_, idx) => next.add(idx));
                        }
                        return next;
                    });
                }

            }, speed);
        }

        return () => clearInterval(interval);
    }, [isScrambling, text, speed, maxIterations, characters, revealedIndices, sequential, revealDirection]);

    // Use a different simpler approach for stability and effect quality
    // Re-implementing core logic for consistent "Matrix" style decrypt
    useEffect(() => {
        // Reset on text change
        setDisplayText(text);
    }, [text]);

    const scramble = () => {
        let iteration = 0;
        const interval = setInterval(() => {
            setDisplayText(
                text
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return text[index];
                        }
                        return characters[Math.floor(Math.random() * characters.length)];
                    })
                    .join("")
            );

            if (iteration >= text.length) {
                clearInterval(interval);
            }

            iteration += 1 / 2; // Speed of reveal
        }, 30);
    };

    // Wrapper to handle constraints
    const handleInteraction = () => {
        scramble();
    }

    // Auto start on mount for specific effect
    useEffect(() => {
        if (animateOn === 'view') {
            scramble();
        }
    }, []);

    return (
        <span
            className={`inline-block whitespace-nowrap ${parentClassName}`}
            onMouseEnter={animateOn === 'hover' ? handleInteraction : undefined}
            {...props}
        >
            <span className={className}>{displayText}</span>
        </span>
    );
}
