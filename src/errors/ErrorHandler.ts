export class ErrorHandler {
  public static handle(ctx: any, next: any) {
    return next().catch((err: { status: number; message: any }) => {
      if (400 == err.status) {
        ctx.status = 400;
        ctx.body = { error: err.message };
      } else if (409 === err.status) {
        ctx.status = 409;
        ctx.body = { error: err.message };
      } else if (401 == err.status) {
        ctx.status = 401;
        ctx.body = { error: 'Protected resource, use Authorization header to get access\n' };
      } else if (404 == err.status) {
        ctx.status = 404;
        ctx.body = { error: err.message };
      } else {
        console.error('Error:', JSON.stringify(err));
        ctx.status = 500;
        ctx.body = { error: 'Internal Server Error' };
      }
    });
  }
}
