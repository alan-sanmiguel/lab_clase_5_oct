import { useState } from 'react';
import CryptoJS from 'crypto-js';
import './Salt.css';

function Salt() {
    const [texto, setTexto] = useState('');
    const [textoCifrado, setTextoCifrado] = useState('');
    const [textoDescifrado, setTextoDescifrado] = useState('');
    const [error, setError] = useState('');

    const cifrar = () => {
        setTextoCifrado(CryptoJS.AES.encrypt(texto, '12345678').toString());
        setTextoDescifrado('');
        setError('');
    }

    const descifrar = () => {
        try {
            const bytes = CryptoJS.AES.decrypt(textoCifrado, '12345678');
            const resultado = bytes.toString(CryptoJS.enc.Utf8);

            if (!resultado) {
                throw new Error('No fue posible descifrar el texto.');
            }

            setTextoDescifrado(resultado);
            setError('');
        } catch {
            setTextoDescifrado('');
            setError('No fue posible descifrar el texto. Verifica el contenido cifrado.');
        }
    }

    return (
        <main className="crypto-page">
            <section className="crypto-card" aria-labelledby="crypto-title">
                <p className="crypto-eyebrow">Laboratorio de seguridad</p>
                <h1 id="crypto-title">Cifrado de texto</h1>
                <p className="crypto-intro">
                    Escribe un texto, cífralo y descifra el resultado cuando lo necesites.
                </p>

                <label className="crypto-label" htmlFor="texto-original">
                    Texto original
                </label>
                <textarea
                    id="texto-original"
                    value={texto}
                    onChange={(event) => setTexto(event.target.value)}
                    placeholder="Escribe aquí el texto que deseas cifrar"
                    rows={4}
                />

                <button className="crypto-button" type="button" onClick={cifrar} disabled={!texto}>
                    Cifrar texto
                </button>

                <div className="crypto-result" aria-live="polite">
                    <h2>Texto cifrado</h2>
                    <p className="crypto-output">{textoCifrado || 'El texto cifrado aparecerá aquí.'}</p>
                </div>

                <button
                    className="crypto-button crypto-button-secondary"
                    type="button"
                    onClick={descifrar}
                    disabled={!textoCifrado}
                >
                    Descifrar texto
                </button>

                <div className="crypto-result" aria-live="polite">
                    <h2>Texto original descifrado</h2>
                    <p className="crypto-output">{textoDescifrado || 'El texto descifrado aparecerá aquí.'}</p>
                </div>

                {error && <p className="crypto-error" role="alert">{error}</p>}
            </section>
        </main>
    )
}

export default Salt;