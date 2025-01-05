# flake.nix
{
    description = "A flake for developing with node22";
  inputs = {
    nixpkgs.url = "github:NixOS/nixpkgs/nixos-unstable";
  };

  outputs = {nixpkgs, ...}: let
    system = "x86_64-linux";
    #       ↑ Swap it for your system if needed
    #       "aarch64-linux" / "x86_64-darwin" / "aarch64-darwin"
    pkgs = nixpkgs.legacyPackages.${system};
  in {
    devShells.${system}.default = pkgs.mkShell {

      packages = [ 
          pkgs.nodejs_22 
          pkgs.watchexec
       ];
      # ...
      env = {
      };

      shellHook = ''
        echo "***************************************************"
        echo "*** Welcome to node"
        echo "***************************************************"
        echo ""
        echo node:$(node --version)
        echo $(watchexec --version)
      '';

    };
  };
}
