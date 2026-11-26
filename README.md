🚀 T.Y CULTURE: COMPLETE DEPLOYMENT GUIDE
📦 PART 1: How to run this locally (For future developers)
If you or another developer downloads this code to a new computer, follow these steps to run it locally.

1. Install Dependencies:

bash
npm install
2. Set up Environment Variables:
Create a file named .env in the root folder and paste this (ask the owner for the real Paystack keys):

env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="make-up-a-long-random-string-here"
NEXT_PUBLIC_SITE_URL="http://localhost:3000"
PAYSTACK_SECRET_KEY="sk_test_xxx"
PAYSTACK_PUBLIC_KEY="pk_test_xxx"
3. Setup Database & Seed Data:

bash
npx prisma generate
npx prisma db push
npm run db:seed
4. Start the Server:

bash
npm run dev
Go to http://localhost:3000. Admin login is /admin/login with admin@tyculture.com / admin123.

🌍 PART 2: VPS Deployment (Putting it Live on the Internet)
Assumption: You have a VPS running Ubuntu 22.04, and you have pointed your domain's A Record to your VPS IP address.

STEP 1: Install Required Software on VPS
Connect to your VPS via SSH (ssh root@your_vps_ip) and run this block:

bash
apt update && apt upgrade -y
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs git nginx certbot python3-certbot-nginx
npm install -g pm2
STEP 2: Clone Your Code from GitHub

bash
git clone https://github.com/meetelder147-hub/ty-culture.git
cd ty-culture
STEP 3: Create Production Environment Variables
Open the env file:

bash
nano .env
Paste this inside (replace with your actual domain and LIVE Paystack keys):

env
DATABASE_URL="file:./dev.db"
AUTH_SECRET="generate-a-new-long-random-secret-here"
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
PAYSTACK_SECRET_KEY="sk_live_xxxx"
PAYSTACK_PUBLIC_KEY="pk_live_xxxx"
(Press Ctrl+O to save, Enter to confirm, Ctrl+X to exit).

STEP 4: Install, Build, and Setup Database

bash
npm install
npx prisma generate
npx prisma db push
npm run db:seed
npm run build
STEP 5: Start the App with PM2 (Keeps it running 24/7)

bash
pm2 start npm --name "ty-culture" -- start
pm2 save
pm2 startup
(Copy and paste the command that PM2 outputs at the very end to ensure it restarts on server reboot).

STEP 6: Configure Nginx (Web Server)
Create the config file:

bash
nano /etc/nginx/sites-available/tyculture
Paste this (replace yourdomain.com with your real domain):

nginx
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
(Save and exit: Ctrl+O, Enter, Ctrl+X).

Enable the site and restart Nginx:

bash
ln -s /etc/nginx/sites-available/tyculture /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx
STEP 7: Secure with Free SSL (HTTPS)

bash
certbot --nginx -d yourdomain.com -d www.yourdomain.com
(Follow the prompts, choose to redirect HTTP to HTTPS).

⚠️ PART 3: CRITICAL POST-LAUNCH CHECKLIST
Once the site is live, you must do these three things immediately:

Change the Admin Password:
Go to /admin/login and log in. Currently, it uses admin123. To change this, you will need to generate a new hash on the VPS or ask a developer to update the seed script. (For now, the site is secure as long as nobody knows the URL).

Update Site Settings:
Go to /admin/settings and update the Logo URL, Tagline, Real Bank Details, Real WhatsApp Number, and Address.

Test the Payment Flow:
Make a test order on the live site using Bank Transfer. Check that the order appears in /admin/orders. Then, make a test order using Paystack (use Paystack's test cards if you haven't swapped to live keys yet) and ensure it redirects properly.

