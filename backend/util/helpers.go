package util

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

var SECRET_KEY = []byte("SO DAMN SECRET!!!") // @TODO: store a key securely somewhere, obviously not as a const here. Hashicorp Vault? SSM? Fly secret?

func VerifyJwt(tokenString string) error {
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		return SECRET_KEY, nil
	})
	if err != nil {
		return err
	}
	if !token.Valid {
		return fmt.Errorf("invalid jwt")
	}

	_, ok := token.Claims.(jwt.MapClaims)

	if !ok {
		return fmt.Errorf("invalid claims")
	}

	return nil
}

func GenerateJwt() (string, error) {
	claims := jwt.RegisteredClaims{
		ExpiresAt: jwt.NewNumericDate(time.Now().Add(time.Hour * 720)),
		Issuer:    "SPOONY",
	}

	t := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	return t.SignedString(SECRET_KEY)
}
