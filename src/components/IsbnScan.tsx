import {type Dispatch, type SetStateAction, useEffect, useRef} from 'react';
import { BarcodeDetector } from 'barcode-detector/ponyfill';

type IsbnScan = {
    setScanning: Dispatch<SetStateAction<boolean>>
    setIsbn: Dispatch<SetStateAction<string>>
}

export default function IsbnScan({setScanning, setIsbn}: IsbnScan) {
    const videoRef = useRef<HTMLVideoElement>(null);

    const detector = new BarcodeDetector({ formats: ['ean_13'] });

    useEffect(() => {
        let stopped = false;

        async function scan() {
            const video = videoRef.current;
            if (stopped || !video) return;

            if (video.readyState >= 2) { // has a frame to read
                const codes = await detector.detect(video);
                const isbn = codes.find(c => /^97[89]\d{10}$/.test(c.rawValue));
                console.log("ISBN: ", isbn?.rawValue);
                if (isbn) {
                    setIsbn(isbn.rawValue)
                    setScanning(false)
                    return
                } // stop once found
            }
            setTimeout(scan, 200); // ~5 scans a second is plenty
        }

        scan();
        return () => { stopped = true; };
    }, []);


    useEffect(() => {
        let stream: MediaStream | undefined;

        navigator.mediaDevices
            .getUserMedia({
                audio: false,
                video:{facingMode: 'environment'}
            })
            .then(s => {
                stream = s;
                if (videoRef.current) videoRef.current.srcObject = s
            })
            .catch(err => console.error('Camera error', err.name));
        return () => stream?.getTracks().forEach(t => t.stop());
    }, []);
    return (
        <div className={"component__wrapper"}>
            <div className={"component__container"}>
                <header>
                    <h1>Scan your book</h1>
                    <p>Align the books barcode (at the back of the book) in the center of the screen</p>
                </header>
                <video ref={videoRef} autoPlay={true} playsInline={true} muted={true}/>
            </div>
        </div>
    )
}