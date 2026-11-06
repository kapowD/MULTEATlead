import { Box, IconButton, Modal as MuiModal } from "@mui/material"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import type { ReactNode } from "react"

interface ModalProps {
    open: boolean
    onClose: () => void
    onNext?: () => void
    onPrev?: () => void
    label?: string
    children: ReactNode
}

const iconStyle = {
    position: "absolute",
    color: "white",
    backgroundColor: "rgba(0,0,0,.5)",
    zIndex: 1,
    "&:hover": { backgroundColor: "rgba(0,0,0,.7)" },
} as const

const Modal = ({
    open,
    onClose,
    onNext,
    onPrev,
    label = "Просмотр изображения",
    children,
}: ModalProps) => (
    <MuiModal
        open={open}
        onClose={onClose}
        sx={{ display: "flex", alignItems: "center", justifyContent: "center", padding: 2 }}
    >
        <Box
            role="dialog"
            aria-modal="true"
            aria-label={label}
            tabIndex={-1}
            onKeyDown={(event) => {
                if (event.key === "ArrowRight" && onNext) {
                    event.preventDefault()
                    onNext()
                }
                if (event.key === "ArrowLeft" && onPrev) {
                    event.preventDefault()
                    onPrev()
                }
            }}
            sx={{
                position: "relative",
                backgroundColor: "white",
                padding: 2,
                borderRadius: 1,
                maxWidth: "100%",
                maxHeight: "100%",
                outline: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            <IconButton
                aria-label="Закрыть изображение"
                onClick={onClose}
                sx={{ ...iconStyle, right: 8, top: 8 }}
            >
                <X />
            </IconButton>
            {onPrev && (
                <IconButton
                    aria-label="Предыдущее изображение"
                    onClick={onPrev}
                    sx={{ ...iconStyle, left: 16 }}
                >
                    <ChevronLeft size={28} />
                </IconButton>
            )}
            {children}
            {onNext && (
                <IconButton
                    aria-label="Следующее изображение"
                    onClick={onNext}
                    sx={{ ...iconStyle, right: 16 }}
                >
                    <ChevronRight size={28} />
                </IconButton>
            )}
        </Box>
    </MuiModal>
)

export default Modal
