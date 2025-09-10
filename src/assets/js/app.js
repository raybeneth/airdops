// Initialize particles.js and wallet functionality
document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js if available
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 80, density: { enable: true, value_area: 800 } },
                color: { value: "#00C2FF" },
                shape: { type: "circle" },
                opacity: { value: 0.5, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#00C2FF",
                    opacity: 0.4,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        });
    } else {
        console.warn('particlesJS 未加载，请检查 CDN 引用');
    }

    // Initialize AppKit safely
    const config = {
        chainId: 1, // Ethereum Mainnet
        chainName: "Ethereum",
        rpc: "https://mainnet.infura.io/v3/",
        showUnsupportedChainPopup: true
    };

    let appKit;

    const initAppKit = window && window.appkit ? window.appkit.initAppKit : undefined;

    if (!initAppKit) {
        console.warn('AppKit SDK 未加载：window.appkit 未定义。请确认已在 index.html 中引入对应 SDK。');
        setupFallbackWallet();
        return;
    }

    (async () => {
        try {
            appKit = await initAppKit(config);

            if (appKit && typeof appKit.isConnected === 'function' && appKit.isConnected()) {
                updateWalletStatus(true, appKit.getAddress());
            }
        } catch (error) {
            console.error('Failed to initialize AppKit:', error);
            setupFallbackWallet();
        }
    })();

    // Setup wallet connection handlers
    setupWalletHandlers(appKit);

    // Simple countdown timer
    function updateCountdown() {
        const countdownElement = document.getElementById('countdown');
        if (countdownElement) {
            // For demo purposes, we'll just show a static time
            countdownElement.textContent = '07:23:19:45';
        }
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
});

function setupFallbackWallet() {
    const connectButton = document.getElementById('connectWallet');
    const claimButton = document.getElementById('claimButton');
    const walletStatus = document.getElementById('walletStatus');

    if (connectButton) connectButton.disabled = true;
    if (claimButton) claimButton.disabled = true;
    if (walletStatus) {
        walletStatus.textContent = 'AppKit SDK 未加载';
        walletStatus.style.color = 'var(--error-color)';
    }
}

function setupWalletHandlers(appKit) {
    const connectButton = document.getElementById('connectWallet');
    const claimButton = document.getElementById('claimButton');
    const walletStatus = document.getElementById('walletStatus');

    if (connectButton) {
        connectButton.addEventListener('click', async function() {
            try {
                if (appKit && typeof appKit.isConnected === 'function' && !appKit.isConnected()) {
                    await appKit.connect();
                    updateWalletStatus(true, appKit.getAddress());
                } else if (appKit && typeof appKit.disconnect === 'function') {
                    appKit.disconnect();
                    updateWalletStatus(false);
                }
            } catch (error) {
                console.error('Wallet connection failed:', error);
                if (walletStatus) {
                    walletStatus.textContent = 'Connection failed. Please try again.';
                    walletStatus.style.color = 'var(--error-color)';
                }
            }
        });
    }

    if (claimButton) {
        claimButton.addEventListener('click', async function() {
            if (!appKit || !appKit.isConnected()) {
                if (walletStatus) {
                    walletStatus.textContent = 'Please connect your wallet first';
                    walletStatus.style.color = 'var(--error-color)';
                }
                return;
            }

            try {
                claimButton.disabled = true;
                claimButton.textContent = 'Processing...';

                setTimeout(() => {
                    claimButton.textContent = 'Claimed Successfully!';
                    claimButton.style.backgroundColor = 'var(--success-color)';
                    if (walletStatus) {
                        walletStatus.textContent = '5,000 ANVI tokens have been sent to your wallet';
                        walletStatus.style.color = 'var(--success-color)';
                    }
                }, 2000);
            } catch (error) {
                console.error('Claim failed:', error);
                claimButton.disabled = false;
                claimButton.textContent = 'Claim Airdrop';
                if (walletStatus) {
                    walletStatus.textContent = 'Transaction failed. Please try again.';
                    walletStatus.style.color = 'var(--error-color)';
                }
            }
        });
    }
}

function updateWalletStatus(connected, address = '') {
    const connectButton = document.getElementById('connectWallet');
    const claimButton = document.getElementById('claimButton');
    const walletStatus = document.getElementById('walletStatus');

    if (connected) {
        if (connectButton) connectButton.textContent = 'Disconnect';
        if (claimButton) claimButton.disabled = false;
        const formattedAddress = `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
        if (walletStatus) {
            walletStatus.textContent = `Connected: ${formattedAddress}`;
            walletStatus.style.color = 'var(--success-color)';
        }
    } else {
        if (connectButton) connectButton.textContent = 'Connect Wallet';
        if (claimButton) claimButton.disabled = true;
        if (walletStatus) {
            walletStatus.textContent = 'Please connect your wallet to claim';
            walletStatus.style.color = 'var(--text-secondary)';
        }
    }
}
