This generator has set up the following stack:
  1. Testing
    * RSpec
    * Capybara
    * Database Cleaner
    * SimpleCov
    * Guard
  2. Frontend
    * Bootstrap
    * Disabled Turbolinks
    * Precompiled assets in production
  3. Gem groups set up for easy Heroku deployment
    * Postgres will work out of the box. No configuration necessary.
  4. Misc
    * Google Analytics

TODO:
  1. Add the line `ruby '2.1.0'` to the top of your Gemfile
  2. An MIT License file has been created for you
    * Add your name and the year
  3. A README.md file has been started for you
    * Add relavent information and screenshots for your app
    * There is a basic template you can follow, but make it your own
  4. Google Analytics is set up to track your app
    * Set up an application on Google Analytics
    * You will need to add your analytics tracking code to `config/secrets.yml`
  5. Set up Airbrake (Optional)
    * If you entered your api key during project creation, you're all set!
    * Otherwise, visit [Airbrake](https://airbrake.io/account/new/Free) and set
    up a free account.
    * When it asks for "subdomain", it really means "username" (it's also a required
      field, even though it doesn't seem like it)
    * Generate your api key, then on your command line (in the project root), run:
      `rails g airbrake --api-key your_api_key_here

Deploying to Heroku:
  1. `bin/setup [<app_name>]`
    * <app_name> is optional. It will, by default, attempt to create an
    app on Heroku using your Rails application name.
  2. `bin/deploy`

Deploying to Ninefold:
  1. Create your app on Ninefold
  2. Add the given SSH key to your account on GitHub
  3. Choose the option for a single-server app
  4. Choose Ruby 2.1.0
  5. Change the name of the Environment Variable from SECRET_TOKEN to SECRET_KEY_BASE
  6. Click deploy (it will probably fail)
  7. Copy the relevant database information from the Database tab
  8. Paste that info in your `config/secrets.yml` file
  9. Push your changes
  10. Re-deploy on Ninefold