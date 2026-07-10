import sys

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

# 1. Add account button
old_nav = '''                <a href="#api">API Reference</a>
            </nav>'''
new_nav = '''                <a href="#api">API Reference</a>
                <button id="btn-account" class="btn btn-primary btn-sm" style="margin-left: 1rem; padding: 0.4rem 1rem;">Account</button>
            </nav>'''
content = content.replace(old_nav, new_nav)

# 2. Extract auth-section
start_auth = '<div id="auth-section">'
end_auth = '<div id="upload-section" class="hidden">'
if start_auth in content and end_auth in content:
    idx_start = content.find(start_auth)
    idx_end = content.find(end_auth)
    auth_html = content[idx_start:idx_end].strip()
    
    # 3. Create modal HTML
    modal_html = f'''
    <!-- Auth Modal -->
    <div id="auth-modal" class="modal hidden">
        <div class="modal-content">
            <button id="btn-close-modal" class="close-btn">&times;</button>
            <div id="modal-logged-in-state" class="hidden" style="text-align: center; padding: 2rem 0;">
                <h3 style="margin-bottom: 1rem;">Account</h3>
                <p style="color: var(--text-secondary); margin-bottom: 2rem;">Logged in as <span id="modal-logged-in-email" style="color: var(--accent-green); font-weight: 600;"></span></p>
                <button class="btn btn-secondary" id="btn-logout" style="width: 100%;">Logout</button>
            </div>
            {auth_html}
        </div>
    </div>
</body>
'''
    # Append modal before body
    content = content.replace('</body>', modal_html)
    
    # Remove auth_html from its original place and add CTA for logged out
    cta_html = '''
                            <div id="logged-out-upload-cta">
                                <p style="font-size: 0.85rem; color: var(--text-secondary); margin-bottom: 1rem;">Please log in to manage your data.</p>
                                <button id="btn-open-login-sidebar" class="btn btn-primary btn-sm" style="width: 100%;">Log In / Register</button>
                            </div>
'''
    content = content.replace(auth_html, cta_html)

# 4. Remove the old logged-in email and logout button from upload section
old_upload_header = '''                                <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.8rem;">
                                    <span style="font-size: 0.85rem; color: var(--accent-green);">Logged in as <span id="logged-in-email" style="font-weight: 600;"></span></span>
                                    <button class="btn btn-secondary btn-sm" id="btn-logout" style="padding: 0.2rem 0.5rem; font-size: 0.75rem;">Logout</button>
                                </div>'''
content = content.replace(old_upload_header, '')

with open('index.html', 'w', encoding='utf-8') as f:
    f.write(content)

print('Done modifying index.html')
