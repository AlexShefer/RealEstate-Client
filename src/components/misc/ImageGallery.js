import { useParams } from "react-router-dom";
import { useState, useCallback } from "react";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import Logo from "../../logo.svg";

export default function ImageGallery({ photos }) {
    //  state

    const [current, setCurrent] = useState(0);
    const [isOpen, setIsOpen] = useState(false);
    // hooks
    const params = useParams();

    const openLightbox = useCallback((event, { photo, index }) => {
        setCurrent(index);
        setIsOpen(true);
    }, []);

    const closeLightbox = useCallback(() => {
        setCurrent(0);
        setIsOpen(false);
    }, []);
    return (
        <>
            <Gallery photos={photos} onClick={openLightbox} />
            <ModalGateway>
                {isOpen ? (
                    <Modal onClose={closeLightbox}>
                        <Carousel
                            currentIndex={current}
                            views={photos.map((photo) => ({
                                ...photo,
                                srcset: photo.srcSet,
                                caption: photo.title,
                            }))}
                        />
                    </Modal>
                ) : null}
            </ModalGateway>
        </>
    );
}
