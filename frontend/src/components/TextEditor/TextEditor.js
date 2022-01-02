import { useState, useCallback, useEffect } from 'react'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import "./TextEditor.css"
import { io } from 'socket.io-client'
import { useParams } from 'react-router-dom'

const SAVE_INTERVAL_MS = 2000;

export default function TextEditor({ documentId }) {
    // const {id: documentId} = useParams();
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();

    useEffect(() => {
        console.log('update')
    }, [documentId])

    // handle saving documents
    useEffect(() => {
        if (socket == null && quill == null) return;

        const interval = setInterval(() => {
            socket.emit('save-document', quill.getContents());
        }, SAVE_INTERVAL_MS);

        return () => {
            clearInterval(interval);
        }
    }, [socket, quill])

    // handle loading documents
    useEffect(() => {
        if (socket == null || quill == null || documentId == null) return;
        socket.once('load-document', document => {
            quill.setContents(document);
            quill.enable();
        })
        socket.emit('get-document', documentId);
    }, [socket, quill, documentId]);

    // handle connecting socket
    useEffect(() => {
        const s = io('http://localhost:3001');
        setSocket(s);

        return () => {
            s.disconnect();
        }
    }, []);

    // handle receiving changes
    useEffect(() => {
        if (socket == null || quill == null) return;
        const handler = (delta) => {
            quill.updateContents(delta);
        }
        socket.on('receive-changes', handler);
        return () => {
            socket.off('receive-changes', handler);
        }
    }, [socket, quill]);

    // handle text change
    useEffect(() => {
        if (socket == null || quill == null) return;
        const handler = (delta, oldDelta, source) => {
            if (source !== 'user') return;
            socket.emit('send-changes', delta);
        }
        quill.on('text-change', handler);
        return () => {
            quill.off('text-change', handler);
        }
    }, [socket, quill]);

    const wrapperRef = useCallback((wrapper) => {
        if (wrapper == null) return;

        wrapper.innerHTML = '';
        const editor = document.createElement('div');
        wrapper.append(editor);
        const q = new Quill(editor, {theme: "snow"});
        q.disable();
        q.setText('No Document Selected');
        setQuill(q);
    }, []);

    return (
        <div className='container' ref={wrapperRef}></div>
    );
}
