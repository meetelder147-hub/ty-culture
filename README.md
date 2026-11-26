```markdown
# 🚀 T.Y Culture - VPS Deployment Guide

This document contains the exact steps to deploy the T.Y Culture Next.js application to a production VPS (Ubuntu 22.04 recommended).

### ⚠️ Prerequisites
1. You have a VPS running Ubuntu 22.04 (e.g., DigitalOcean, Hostinger, Contabo).
2. You have pointed your domain's **A Record** to your VPS IP address.
3. You are logged into your VPS via SSH as `root`.

---

### STEP 1: Install Required Software
Copy and paste this entire block into your VPS terminal. This installs Node.js, Git, Nginx (web server), Certbot (SSL), and PM2 (process manager).

```bash
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx certbot python3-certbot-nginx
npm install -g pm2
```

---

### STEP 2: Clone the Repository
Clone your code from GitHub to the server. *(If the repo is private, you will need to use a GitHub Personal Access Token or deploy key).*

```bash
git clone https://github.com/meetelder147-hub/ty-culture.git
cd ty-culture
```

---

### STEP 3: Setup Production Environment Variables
Create the `.env` file:

```bash
nano .env
```

Paste the following into the file. **Make sure to replace the placeholders with your actual domain and LIVE Paystack keys:**

```env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="generate-a-very-long-random-string-here-for-security"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
PAYSTACK_SECRET_KEY="sk_live_xxxxxxxxxxxxxxxxxxxxxxxxx"
PAYSTACK_PUBLIC_KEY="pk_live_xxxxxxxxxxxxxxxxxxxxxxxxx"
```

*(Press `Ctrl + O` to save, hit `Enter` to confirm, then `Ctrl + X` to exit).*

---

### STEP 4: Build & Setup the Database
Run these commands to install dependencies, set up the database, seed the admin account, and build the app:

```bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run build
```

---

### STEP 5: Start the App (Keep it running 24/7)
Use PM2 to run the Next.js app in the background.

```bash
pm2 start npm --name "ty-culture" -- start
pm2 save
pm2 startup
```
**Important:** The `pm2 startup` command will output a long command (starting with `sudo env PATH=...`). **Copy that entire line, paste it into your terminal, and hit Enter.** This ensures your site automatically restarts if the server reboots.

---

### STEP 6: Configure Nginx (Web Server)
Create the Nginx configuration file:

```bash
nano /etc/nginx/sites-available/tyculture
```

Paste this configuration (replace `yourdomain.com` with your actual domain):

```nginx
server {
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```
*(Save and exit: `Ctrl + O`, `Enter`, `Ctrl + X`).*

Enable the site and restart Nginx:

```bash
ln -s /etc/nginx/sites-available/tyculture /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
```

---

### STEP 7: Install Free SSL (HTTPS)
Run this command to secure your site with a free Let's Encrypt certificate (replace `yourdomain.com`):

```bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
```
*(When prompted, type `2` to redirect all traffic to HTTPS, and enter your email if asked).*

---

### 🎉 POST-LAUNCH CHECKLIST

Your site is now live! Open your browser and go to `https://yourdomain.com`.

1. **Admin Login:** Go to `https://yourdomain.com/admin/login`.
   - **Default Email:** `admin@tyculture.com`
   - **Default Password:** `admin123`
2. **Change Password:** Immediately log in and change the admin password for security.
3. **Update Settings:** Go to `/admin/settings` and update the **Logo, Tagline, Bank Details, and WhatsApp Number**.
4. **Test Payments:** Make a test order using Bank Transfer and Paystack to ensure the flow is working perfectly.
```
