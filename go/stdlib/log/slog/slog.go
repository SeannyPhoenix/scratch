package slog

import (
	"context"
	"errors"
	"log/slog"
)

func Run(ctx context.Context) {
	a(ctx)
}

func a(ctx context.Context) {
	err := errors.New("error")
	ssml := "ssml"
	msg := "message"

	slog.InfoContext(ctx, "Custom log message", slog.String("key", "value"))
	slog.WarnContext(ctx, "error in executing command", slog.Any("error", err), slog.String("ssml", ssml))
	slog.ErrorContext(
		ctx,
		"responding with error",
		slog.Any("error", err),
		slog.Any("resp", msg),
	)
}
