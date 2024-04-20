{
  description = "A Nix-flake-based Node.js development environment";

  inputs = {
    nixpkgs.url = "github:nixos/nixpkgs/nixos-23.11";
  };

  outputs = { self , nixpkgs ,... }: let
    # system should match the system you are running on
    system = "x86_64-linux";
    #system = "x86_64-darwin";
  in {
    devShells."${system}".default = let
      pkgs = import nixpkgs {
        inherit system;
      };
    in pkgs.mkShell {
      # create an environment with nodejs_20, npm, pnpm, and yarn
      packages = with pkgs; [
        nodejs_20
        nodePackages_latest.npm
        just
      ];

      shellHook = ''
        echo "node `${pkgs.nodejs_20}/bin/node --version`"
        echo "npm `npm --version`"
        zsh
      '';
    };
  };
}