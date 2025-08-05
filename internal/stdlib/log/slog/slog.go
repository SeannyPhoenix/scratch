package slog

import (
	"context"
	"errors"
	"log/slog"

	"github.com/seannyphoenix/scratch/pkg/module"
	"github.com/seannyphoenix/scratch/pkg/unit"
)

var Module = module.NewModule("slog", Run)

var units = []unit.Unit{
	unit.NewUnit("a", a),
}

func Run(ctx context.Context) error {
	for _, u := range units {
		if err := u.Run(ctx); err != nil {
			return err
		}
	}
	return nil
}

func a(ctx context.Context) error {
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
	return nil
}
