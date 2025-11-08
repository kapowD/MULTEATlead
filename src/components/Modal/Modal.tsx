import { Box, IconButton } from "@mui/material"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface ModalProps {
    open: boolean
    onClose: () => void
    onNext?: () => void
    onPrev?: () => void
    children: React.ReactNode
}

const Modal = ({ open, onClose, onNext, onPrev, children }: ModalProps) => {
    if (!open) return null

    return (
        <Box
            onClick={onClose}
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.7)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                zIndex: 1300,
                opacity: 0,
                transition: "background-color 0.3s ease-in-out, opacity 0.3s ease-in-out",
                animation: "fadeIn 0.3s ease-in-out forwards",
                "@keyframes fadeIn": {
                    "0%": { backgroundColor: "rgba(0, 0, 0, 0)", opacity: 0 },
                    "100%": { backgroundColor: "rgba(0, 0, 0, 0.7)", opacity: 1 },
                },
            }}
        >
            <Box
                onClick={(e) => e.stopPropagation()}
                sx={{
                    position: "relative",
                    backgroundColor: "white",
                    padding: 2,
                    borderRadius: 1,
                    transform: "scale(0.9)",
                    opacity: 0,
                    animation: "scaleIn 0.3s ease-in-out forwards",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    "@keyframes scaleIn": {
                        "0%": { transform: "scale(0.9)", opacity: 0 },
                        "100%": { transform: "scale(1)", opacity: 1 },
                    },
                }}
            >
                {/* Закрыть */}
                <IconButton
                    onClick={onClose}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8,
                        color: "white",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        transition: "background-color 0.2s ease-in-out",
                        "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.7)" },
                    }}
                >
                    <X />
                </IconButton>

                {/* Стрелка влево */}
                {onPrev && (
                    <IconButton
                        onClick={onPrev}
                        sx={{
                            position: "absolute",
                            left: 16,
                            color: "white",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                        }}
                    >
                        <ChevronLeft size={28} />
                    </IconButton>
                )}

                {children}

                {/* Стрелка вправо */}
                {onNext && (
                    <IconButton
                        onClick={onNext}
                        sx={{
                            position: "absolute",
                            right: 16,
                            color: "white",
                            backgroundColor: "rgba(0,0,0,0.4)",
                            "&:hover": { backgroundColor: "rgba(0,0,0,0.6)" },
                        }}
                    >
                        <ChevronRight size={28} />
                    </IconButton>
                )}
            </Box>
        </Box>
    )
}

export default Modal
