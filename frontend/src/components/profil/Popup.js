import { Modal, Paper } from '@mui/material';

function Popup({ open, children }) {
    return (
        <Modal
            open={open}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Paper
                sx={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    minWidth: 400,
                    maxWidth: 800,
                    bgcolor: '#ffffff',
                    border: '2px solid #000',
                    boxShadow: 24,
                    p: 4,
                    border: 'none',
                }}
            >
                {children}
            </Paper>
        </Modal>
    );
}
export default Popup;
