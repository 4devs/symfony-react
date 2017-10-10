set :application, "symfony"
set :domain,      "#{application}.pro"
set :deploy_to,   "/var/www/#{application}"
set :app_path,    "app"
set :bin_path,    "bin"
set :var_path,    "var"
set :web_path,    "web"
set :symfony_env_prod, "prod"
set :symfony_console,       bin_path + "/console"
set :log_path,              var_path + "/logs"
set :cache_path,            var_path + "/cache"
set :frontend_path,         "frontend"

set :shared_files,      ["app/config/parameters.yml"]
set :shared_children,     [var_path + "/logs", "vendor", var_path + "/sessions/" + symfony_env_prod , frontend_path + "/node_modules"]

set :writable_dirs, [var_path + "/cache", var_path + "/logs", var_path + "/sessions"]
set :webserver_user,    "nginx"
set :user, "symfony"
set :permission_method, :acl
set :use_set_permissions,   true
ssh_options[:forward_agent] = true

set :use_composer, true
# set :update_vendors, true
# set :dump_assetic_assets, true

set :repository,  "git@github.com:4devs/symfony-react.git"
set :branch,      "master"
set :scm,         :git
# Or: `accurev`, `bzr`, `cvs`, `darcs`, `subversion`, `mercurial`, `perforce`, or `none`

set :model_manager, "doctrine"
# Or: `propel`

role :web,        domain                         # Your HTTP server, Apache/etc
role :app,        domain, :primary => true       # This may be the same as your `Web` server

set  :keep_releases,  3
after "deploy:update", "deploy:cleanup"
after "deploy:finalize_update", "frontend:yarn:install"
before "deploy:create_symlink", "frontend:yarn:build"

set  :use_sudo,      false
# Be more verbose by uncommenting the following line
#logger.level = Logger::MAX_LEVEL


namespace :frontend do
    namespace :yarn do
        desc "yarn install"
        task :install do
            run "cd #{latest_release}/#{frontend_path} && yarn install"
        end
        desc "yarn build"
        task :build do
            run "cd #{latest_release}/#{frontend_path} && yarn build"
        end
    end
end
