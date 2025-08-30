let generatedPassword = '';
        
        function generatePassword() {
            const uppercase = document.getElementById('uppercase').checked;
            const lowercase = document.getElementById('lowercase').checked;
            const numbers = document.getElementById('numbers').checked;
            const symbols = document.getElementById('symbols').checked;
            
            // Character sets
            const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
            const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
            const numberChars = '0123456789';
            const symbolChars = '!@#$%^&*()_+-=[]{}|;:,.<>?';
            
            // Build character pool
            let charPool = '';
            if (uppercase) charPool += uppercaseChars;
            if (lowercase) charPool += lowercaseChars;
            if (numbers) charPool += numberChars;
            if (symbols) charPool += symbolChars;
            
            // Check if at least one option is selected
            if (charPool === '') {
                alert('Please select at least one character type!');
                return;
            }
            
            // Generate 16-character password
            generatedPassword = '';
            for (let i = 0; i < 16; i++) {
                const randomIndex = Math.floor(Math.random() * charPool.length);
                generatedPassword += charPool[randomIndex];
            }
            
            // Display password
            const display = document.getElementById('passwordDisplay');
            display.textContent = generatedPassword;
            display.classList.add('generated');
            
            // Enable copy button
            const copyBtn = document.getElementById('copyBtn');
            copyBtn.classList.add('active');
            copyBtn.classList.remove('copied');
            copyBtn.textContent = '📋 Copy Password';
        }
        
        function copyPassword() {
            if (generatedPassword === '') return;
            
            navigator.clipboard.writeText(generatedPassword).then(() => {
                const copyBtn = document.getElementById('copyBtn');
                copyBtn.classList.add('copied');
                copyBtn.textContent = '✅ Copied!';
                
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.textContent = '📋 Copy Password';
                }, 2000);
            }).catch(err => {
                // Fallback for older browsers
                const textArea = document.createElement('textarea');
                textArea.value = generatedPassword;
                document.body.appendChild(textArea);
                textArea.select();
                document.execCommand('copy');
                document.body.removeChild(textArea);
                
                const copyBtn = document.getElementById('copyBtn');
                copyBtn.classList.add('copied');
                copyBtn.textContent = '✅ Copied!';
                
                setTimeout(() => {
                    copyBtn.classList.remove('copied');
                    copyBtn.textContent = '📋 Copy Password';
                }, 2000);
            });
        }
        
        // Generate a password on page load
        window.onload = function() {
            generatePassword();
        };